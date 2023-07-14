import { Typography } from "antd";

function AppFooter() {
    return<div className="AppFooter">
        <Typography.Link href="tel:+010-0000-0000">+010-0000-0000</Typography.Link>
        <Typography.Link href="https://www.google.com" target={"_blank"}>Privacy Policy</Typography.Link>
        <Typography.Link href="https://www.google.com" target={"_blank"}>Terms of Use</Typography.Link>
    </div>
}
export default AppFooter;