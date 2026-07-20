
export default function Footer() {
    const socials = [
        {
            platform: "Facebook",
            icon:"fa-brands fa-facebook",
            link: "//www.facebook.com/profile.php?id=61581922296679"
        },
        {
            platform: "Linkedin",
            icon:"fa-brands fa-linkedin",
            link: "//www.linkedin.com/company/bizbandhan/"
        }
    ]
    return (<>
        <footer>
            <div className="info">
                <div className="logo">
                    <img src={ "/logo.png" } />
                    <ul className="socials">
                        {
                            socials.map(
                                social => <li key={ social.platform }>
                                    <a href={ social.link }>
                                        <i className={ social.icon }></i>
                                        {/* { social.platform } */}
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="policies">
                    <ul>
                        <li>
                            <a href="/policy/privacy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/policy/cookie">Cookie Policy</a>
                        </li>
                        <li>
                            <a href="/policy/terms">Terms of use</a>
                        </li>
                        <li>
                            <a href="/faq">Frequently Asked Questions</a>
                        </li>
                        <li><a href="/contact">Contact us</a></li>
                    </ul>
                </div>
                {/* <span>Building trust between families and milk vendors, one delivery at a time.</span> */ }
            </div>
            <div className="copyright">
                © 2026 BizBandhan Made with ❤️ in India
            </div>
        </footer>
    </>)
}