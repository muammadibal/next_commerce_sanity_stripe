import { loadStripe } from "@stripe/stripe-js";

let stripePromise

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_xDlR1tiWkPQHjUrIwKTB6XMd00EWz063Ng')
    }

    return stripePromise
}

export default getStripe