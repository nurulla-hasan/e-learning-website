
const TermsCondition = () => {
    return (
        <>
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to [Your Store Name]! By accessing or using our website (the Site), you agree to be bound by the
                            following Terms and Conditions. Please read them carefully.
                        </p>
                    </section>

                    {/* General */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. General</h2>
                        <p className="text-gray-700 leading-relaxed">
                            This website is operated by [Your Business Name]. Throughout the site, the terms we, us, and our
                            refer to the store. By visiting or purchasing from our store, you agree to accept these terms, including
                            any additional policies referenced herein.
                        </p>
                    </section>

                    {/* Products */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Products</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
                            <p>
                                • We specialize in authentic collectible items, including Pokémon sealed products, sports card singles,
                                and licensed sportswear. Product availability and descriptions are subject to change without notice.
                            </p>
                            <p>• We strive to provide accurate product images and details.</p>
                            <p>• All product sales are subject to stock availability.</p>
                            <p>• We reserve the right to limit quantities or cancel orders at our discretion.</p>
                        </div>
                    </section>

                    {/* Pricing & Payments */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Pricing & Payments</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
                            <p>
                                • All prices are listed in [Your Currency] and are inclusive/exclusive of applicable taxes as specified.
                            </p>
                            <p>• We accept payment through [e.g., Visa, MasterCard, PayPal, Stripe, etc.]</p>
                            <p>• Pricing may change at any time without notice.</p>
                            <p>• Promotional codes or discounts cannot be applied retroactively.</p>
                        </div>
                    </section>

                    {/* Shipping */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Shipping</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
                            <p>• We offer national and international shipping depending on the item.</p>
                            <p>• Orders are usually processed within 1-2 business days.</p>
                            <p>• Delivery times may vary based on location and carrier.</p>
                            <p>• We are not responsible for delays caused by customs or third-party carriers.</p>
                            <p>• More details are available on our [Shipping Policy] page.</p>
                        </div>
                    </section>

                    {/* Returns & Refunds */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Returns & Refunds</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
                            <p>• You may return eligible items within 14 days of delivery.</p>
                            <p>• Items must be unopened, unused, and in their original packaging.</p>
                            <p>• Certain products (e.g., opened sealed packs) are non-returnable.</p>
                            <p>
                                • Return shipping costs are the responsibility of the customer unless the item was incorrect or
                                defective.
                            </p>
                            <p>• Please review our [Return Policy] for more information.</p>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed">
                            All content on this website, including images, text, logos, and graphics, is the property of [Your Store
                            Name] and may not be copied, modified, or used without written permission.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. User Accounts</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2 pl-4">
                            <p>• You may be required to create an account to access certain features.</p>
                            <p>• You are responsible for maintaining the confidentiality of your login details.</p>
                            <p>• You agree to provide accurate and up-to-date information.</p>
                            <p>• We reserve the right to suspend or terminate accounts found in violation of our terms.</p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We are not liable for any damages or losses arising from your use of our site or products, except as
                            required by law. All purchases are made at your own discretion and risk.
                        </p>
                    </section>
                </div>
            </main>
        </>
    )
}

export default TermsCondition;