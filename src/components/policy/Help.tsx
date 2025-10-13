const Help = () =>{
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Frequently Asked Questions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">✅ Frequently Asked Questions (FAQs)</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <p className="font-medium">How long does shipping take?</p>
                <p>
                  Orders are usually processed within 1 - 2 business days. Delivery times vary by location — you&apos;`ll get
                  tracking as soon as your order ships.
                </p>
              </div>
              <div>
                <p className="font-medium">Do you ship internationally?</p>
                <p>
                  Yes! We ship many of our products worldwide. Shipping rates and delivery times depend on your country.
                </p>
              </div>
              <div>
                <p className="font-medium">Can I change or cancel my order?</p>
                <p>
                  If you need to update your order, please contact us as soon as possible. We&apos;ll do our best to help if
                  the order hasn&apos;`t shipped yet.
                </p>
              </div>
              <p>
                Check our <span className="text-blue-600 underline">FAQ page</span> for more details.
              </p>
            </div>
          </section>

          {/* Payments & Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💳 Payments & Security</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <p className="font-medium">What payment methods do you accept?</p>
                <p>We accept major credit/debit cards, PayPal, and [any local payment option, e.g., Klarna].</p>
              </div>
              <div>
                <p className="font-medium">Is my payment secure?</p>
                <p>
                  Absolutely. Payments are processed through trusted, encrypted gateways — we never store your card
                  details.
                </p>
              </div>
            </div>
          </section>

          {/* Product Authenticity */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🛡️ Product Authenticity</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <p className="font-medium">Are your products genuine?</p>
                <p>
                  Yes! All our Pokémon products, sports singles, and jerseys are 100% authentic, sourced directly from
                  trusted distributors and suppliers.
                </p>
              </div>
              <div>
                <p className="font-medium">What condition are your cards/products in?</p>
                <p>
                  Each listing clearly states product condition — from sealed packs to near-mint singles. If you have
                  any questions, reach out before you buy!
                </p>
              </div>
            </div>
          </section>

          {/* Need More Help */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">❓ Need More Help?</h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>Need further assistance? Our friendly support team is available via:</p>
              <p>📧 Email: example@gmail.com</p>
              <p>📞 Phone: +18003434342</p>
              <p>📍 Address: 2118 Thornridge Cir, Syracuse, Connecticut 35624</p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Help;