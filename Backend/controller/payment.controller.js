import Stripe from 'stripe';

// Prevent crash if key is missing by using a dummy key for initialization
const stripeKey = process.env.STRIPE_SECRET_KEY;
let stripe;
if (stripeKey) {
    try {
        stripe = new Stripe(stripeKey);
    } catch(e) {
        console.error("Failed to init Stripe:", e);
    }
}

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency = "usd" } = req.body;

        // If using dummy key or explicit mock mode, return fake secret
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_dummy_key_12345") {
             console.log("Stripe Mock: Creating mock payment intent");
             return res.send({
                clientSecret: "pi_mock_1234567890_secret_test",
             });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const handleWebhook = async (req, res) => {
    // This requires raw body which might need express config changes
    // For now, we'll placeholder this or assume the main endpoint is enough for the demo
    // In a real app, this verifies the signature and fulfills the order securely
    console.log("Webhook received", req.body);
    res.json({ received: true });
};
