import {
  reactExtension,
  Banner,
  Text,
  useApi,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';
import {useEffect, useState} from 'react';

/**
 * "Order reserved for the next M:SS" countdown banner for the checkout page.
 * Placed as an app block, so you can position it wherever you like in the
 * checkout editor (drag it to the very top to match Smooche).
 *
 * The deadline is stored in the extension's session storage, so the timer
 * keeps counting from where it was even if the buyer reloads or navigates
 * between checkout steps — it does NOT restart every render.
 */
export default reactExtension('purchase.checkout.block.render', () => (
  <OrderReservationTimer />
));

function OrderReservationTimer() {
  const {storage} = useApi();
  const settings = useSettings();

  // Merchant-configurable via the checkout editor (with sensible defaults).
  const minutes =
    Number(settings.timer_minutes) > 0 ? Number(settings.timer_minutes) : 10;
  const label = settings.message || 'Order reserved for the next';
  const totalMs = minutes * 60 * 1000;

  const [remainingMs, setRemainingMs] = useState(null);

  useEffect(() => {
    let active = true;
    let interval;

    async function start() {
      // Reuse an existing deadline if one is still in the future; otherwise
      // start a fresh countdown from now.
      let deadline = Number(await storage.read('reservation_deadline'));
      const now = Date.now();
      if (!deadline || deadline <= now) {
        deadline = now + totalMs;
        await storage.write('reservation_deadline', deadline);
      }
      if (!active) return;

      const tick = () => {
        let ms = deadline - Date.now();
        if (ms <= 0) {
          // Loop so the banner always shows time remaining (urgency).
          // To instead STOP at 0:00, replace the two lines below with:
          //   ms = 0; if (interval) clearInterval(interval);
          deadline = Date.now() + totalMs;
          storage.write('reservation_deadline', deadline);
          ms = totalMs;
        }
        setRemainingMs(ms);
      };

      tick();
      interval = setInterval(tick, 1000);
    }

    start();
    return () => {
      active = false;
      if (interval) clearInterval(interval);
    };
  }, [totalMs]);

  if (remainingMs == null) return null;

  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const mm = Math.floor(totalSeconds / 60);
  const ss = String(totalSeconds % 60).padStart(2, '0');

  return (
    <Banner status="success">
      <Text emphasis="bold">
        {label} {mm}:{ss}
      </Text>
    </Banner>
  );
}
