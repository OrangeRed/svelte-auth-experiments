// TODO use sendgrid and actually send out an email

export const sendEmailVerificationLink = async (token: string) => {
	const url = `http://localhost:5173/verify-email/${token}`;
	console.log(`\nYour email verification link: ${url}`);
};

export const sendPasswordResetLink = async (token: string) => {
	const url = `http://localhost:5173/change-password/${token}`;
	console.log(`\nYour password reset link: ${url}`);
};
