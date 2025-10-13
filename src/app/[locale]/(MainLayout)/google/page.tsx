import GoogleTranslate from "@/components/GoogleTranslator/GoogleTranslate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const GooglePage = () =>{
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Google Translate */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Google Translate Demo</h1>
          <GoogleTranslate />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Google Translate Integration</CardTitle>
              <CardDescription>
                This page demonstrates how to use Google Translate widget in Next.js for free
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use the language selector in the top right corner to translate this entire page into different
                languages. The translation is powered by Google Translate and works completely free of charge.
              </p>
            </CardContent>
          </Card>

          {/* Bengali Content */}
          <Card>
            <CardHeader>
              <CardTitle>বাংলা কন্টেন্ট</CardTitle>
              <CardDescription>এই অংশটি বাংলায় লেখা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                গুগল ট্রান্সলেট একটি বিনামূল্যের অনুবাদ সেবা যা আপনার ওয়েবসাইটের সমস্ত কন্টেন্ট স্বয়ংক্রিয়ভাবে বিভিন্ন ভাষায় অনুবাদ করতে পারে।
              </p>
              <p>এটি ব্যবহার করা খুবই সহজ এবং কোনো API key বা পেমেন্টের প্রয়োজন নেই।</p>
            </CardContent>
          </Card>

          {/* English Content */}
          <Card>
            <CardHeader>
              <CardTitle>English Content</CardTitle>
              <CardDescription>This section is written in English</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Google Translate widget is a free service that can automatically translate all content on your website
                into different languages.
              </p>
              <p>
                It&apos;s very easy to use and doesn&apos;t require any API keys or payments. Simply select a language from the
                dropdown and the entire page will be translated.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features / বৈশিষ্ট্যসমূহ</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Free to use / বিনামূল্যে ব্যবহার</li>
                <li>No API key required / কোনো API key প্রয়োজন নেই</li>
                <li>Supports 100+ languages / ১০০+ ভাষা সাপোর্ট</li>
                <li>Automatic page translation / স্বয়ংক্রিয় পেজ অনুবাদ</li>
                <li>Easy integration / সহজ ইন্টিগ্রেশন</li>
                <li>Mobile responsive / মোবাইল রেসপন্সিভ</li>
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use / কিভাবে ব্যবহার করবেন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">English Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Look for the language selector in the top right</li>
                    <li>Click on the dropdown arrow</li>
                    <li>Select your preferred language</li>
                    <li>The entire page will be translated automatically</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">বাংলা নির্দেশনা:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>উপরের ডানদিকে ভাষা নির্বাচক খুঁজুন</li>
                    <li>ড্রপডাউন তীরে ক্লিক করুন</li>
                    <li>আপনার পছন্দের ভাষা নির্বাচন করুন</li>
                    <li>সম্পূর্ণ পেজ স্বয়ংক্রিয়ভাবে অনুবাদিত হবে</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>Google Translate Next.js Integration Demo | Powered by Google Translate Widget</p>
        </div>
      </footer>
    </div>
  )
}

export default GooglePage;
