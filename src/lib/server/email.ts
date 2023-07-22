// TODO use sendgrid and actually send out an email

export const sendEmailVerificationLink = async (token: string) => {
	const url = `http://localhost:5173/email-verification/${token}`;
	console.log(`\nYour email verification link: ${url}`);
};

export const sendPasswordResetLink = async (token: string) => {
	const url = `http://localhost:5173/password-reset/${token}`;
	console.log(`Your password reset link: ${url}`);
};
