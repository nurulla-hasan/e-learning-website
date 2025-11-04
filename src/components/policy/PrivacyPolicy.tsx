const PrivacyPolicy = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              Triplemcollectibles is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and protect your
              personal information when you visit or make a purchase from our
              website Triplemcollectibles.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>
                When you visit our site or place an order, we may collect the
                following information:
              </p>
              <p>
                • Personal Information: Name, email address, phone number,
                billing and shipping addresses.
              </p>
              <p>
                • Payment Information: Payment method details (handled securely
                via third-party processors).
              </p>
              <p>
                • Order History: Products purchased, quantities, and shipping
                details.
              </p>
              <p>
                • Device Information: IP address, browser type, time zone, pages
                viewed, and other analytics data.
              </p>
              <p>
                • Marketing Data: Preferences, reviews, or feedback you
                voluntarily provide.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>We use your information to:</p>
              <p>• Process and fulfill your order</p>
              <p>
                • Communicate with you about orders, returns, or account updates
              </p>
              <p>• Provide customer support</p>
              <p>• Improve our website and user experience</p>
              <p>• Send marketing emails (only if you opt in)</p>
              <p>• Prevent fraud and secure the website</p>
            </div>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Sharing Your Information
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>
                We do not sell your personal information. However, we may share
                data with trusted third parties to fulfill your orders or
                operate our services such as:
              </p>
              <p>• Payment gateways (e.g., Stripe, PayPal, Klarna)</p>
              <p>• Shipping and logistics providers</p>
              <p>• Email marketing platforms (e.g., Mailchimp)</p>
              <p>• Website analytics providers (e.g., Google Analytics)</p>
              <p>
                • All partners are required to protect your data under
                applicable laws
              </p>
            </div>
          </section>

          {/* Cookies & Tracking Technologies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Cookies & Tracking Technologies
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>
                • We use cookies and similar tracking tools to improve your
                browsing experience, remember your preferences, and analyze site
                traffic.
              </p>
              <p>
                • You can manage or disable cookies through your browser
                settings.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Your Rights
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>Depending on your country, you may have the right to:</p>
              <p>• Access, update, or delete your personal data</p>
              <p>• Object to or restrict our use of your data</p>
              <p>• Withdraw your consent for marketing</p>
              <p>• File a complaint with a data protection authority</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
