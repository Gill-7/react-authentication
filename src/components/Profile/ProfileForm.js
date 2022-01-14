import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const submitHandler = event => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEfE6kHN4H6kvgdb7GKz4SKi0N7WqT_G0',
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPassword,
					returnSecureToken: false,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then(res => {
			history.replace('/auth');
		});
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" minLength="7" id="new-password" />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
