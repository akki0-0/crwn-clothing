import SignIn from "../../components/sign-in/sign-in.component"
import SignUp from "../../components/sign-up/sign-up.component"
import './sign-in_sign-out.styles.scss'

const SignIn_SignOut = () => (
    <div className="sign-in_sign-out">
        <SignIn />
        <SignUp />
    </div>
)

export default SignIn_SignOut