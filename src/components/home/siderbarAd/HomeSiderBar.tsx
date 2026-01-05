import Script from "next/script";

const isProduction = process.env.APP_ENV === "production";

export default function HomeSiderBar() {
    if (!isProduction) {
        return null;
    }

    return (
        <div>
            {/* 광고 마크업 */}
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3373210774302054"
                data-ad-slot="7020329216"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            {/* 광고 초기화 스크립트 */}
            <Script id="adsbygoogle-init" strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
        </div>
    );
}
