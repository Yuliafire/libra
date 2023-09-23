document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("nav-btn").addEventListener("click", function () {
		document.querySelector(".header").classList.toggle("open");
	});
});

document.addEventListener("click", ({ target }) => {
	if (target.closest("header .ms ul li a") || !target.closest(".ms")) {
		document.getElementById("nav-btn").checked = false;
	}
});

/* modals and popups */
let isLoggedIn = false;
function logIn() {
	isLoggedIn = true;
}
function logOut() {
	isLoggedIn = false;
}

const USER_INFO = "user info"; // FOR STRING CONST

const btnIcon = document.getElementById("btnLoginIcon"); //profile-icon id
const menuProfileNonauth = document.getElementById("menuProfileNonauth"); /*1st menu*/
const menuProfileAuth = document.getElementById("menuProfileAuth");
const btnLogin = document.getElementById("loginBtn"); //1st menu login button id
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("btnLogIn");
const btnCrossLogin = document.getElementById("crossLogin"); //close login menu with a cross
 //login btn to get into auth-menu  --> to profile
const registerForm = document.getElementById("registerForm");
const registerFormLink = document.getElementById("registerFormLink");
const modalProfile = document.getElementById("modalProfile");
const loginFormLink = document.getElementById("loginFormLink");
const btnCrossRegister = document.getElementById("crossRegister");
const logOutBtn = document.getElementById("logOutBtn");
const btnProfile = document.getElementById("btnProfile");
const crossProfile = document.getElementById("crossProfile");
const regBtn = document.getElementById("regBtn");
const signUpRegister = document.getElementById("signUpRegister");
const checkCard = document.getElementById("checkCard");
const libraryCardChecked = document.getElementById("libraryCardChecked");
const libraryCardNotchecked = document.getElementById("libraryCardNotchecked");
const profileBtnLink = document.getElementById("profileBtnLink");

//input selectors start//
const registerName = document.getElementById("registerName");
const registerFamilyName = document.getElementById("registerFamilyName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const svgProfileIcon = document.getElementById("svgProfileIcon");
const buttonInits = document.getElementById("buttonInits");
//input selectors end//

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const userAvatarInitials = document.getElementById('userAvatarInitials');
const fullNameUser = document.getElementById('fullNameUser');
const buyButtons = document.querySelectorAll("#buyBtn");
const wrapperModal = document.getElementById("wrapperModal");

//open non-auth menu
btnIcon.addEventListener("click", openModal);
function openModal() {
	// console.log(isLoggedIn);
	if (!isLoggedIn) {
		menuProfileNonauth.classList.remove("close");
		menuProfileNonauth.classList.add("open");
	} else {
		menuProfileAuth.classList.remove("close");
		menuProfileAuth.classList.add("open");
	}
}

function closeModal() {
	menuProfileNonauth.classList.add("close");
	menuProfileNonauth.classList.remove("open");
	closeModalLogin();


wrapperModal.addEventListener('click', (event) => {
		const target = event.target;
		if (!target.closest('.outside-click')) {
			closeModal();
			//closeRegisterForm();
		}
console.log(event.target, event)});


	/*
	document.onclick = function (e) {
		if (e.target.className != "menuProfileNonauth") {
			menuProfileNonauth.style.display = "none";
		};
	 */
	};

menuProfileAuth.addEventListener('click', event => event.stopPropagation());


btnLogin.addEventListener("click", openLoginForm);
function openLoginForm() {
	wrapperModal.classList.add("wrapper-modal_open");
	menuProfileNonauth.classList.add("close");
	menuProfileNonauth.classList.remove("open");
	loginForm.classList.remove("close");
	loginForm.classList.add("open");
	document.body.style.overflow = "hidden";
}

//modal login start//
loginButton.addEventListener("click", loginUser);
function loginUser() {
	logIn();
	const resultUserRegister = checkUserRegistered();
	if (resultUserRegister === null) {
		alert("sorry, you haven't registered yet");
		// logOut();
	} else {
		const nameUserRegistered = resultUserRegister.name;
		const familyNameUserRegistered = resultUserRegister.familyName;
		const profileIconName =
			nameUserRegistered[0].toUpperCase() +
			"." +
			familyNameUserRegistered[0].toUpperCase();
		svgProfileIcon.classList.add("closeSvg");
		btnIcon.classList.remove("open");
		btnIcon.classList.add("close");
		buttonInits.classList.remove("close");
		buttonInits.classList.add("open");
		buttonInits.textContent = profileIconName;
	}

	closeModal();
	//  btnIcon.textContent = buttonInits;
	//  btnIcon.classList.add('login-auth');
	buttonInits.textContent = profileIconName;
	menuProfileAuth.classList.remove("close");
	menuProfileAuth.classList.add("open");
	wrapperModal.classList.remove("wrapper-modal_open");
	document.body.style.overflow = "auto";
}

function checkUserRegistered() {
	const emailUserRegistered = emailInput.value;
	const passwordUserRegistered = passwordInput.value;
	const infoUserFromLocalSt = localStorage.getItem(USER_INFO);
	if (infoUserFromLocalSt === null) {
		return null;
	} else {
		const parsedInfoUserFromLocalSt = JSON.parse(infoUserFromLocalSt);
		const userFind = parsedInfoUserFromLocalSt.find(
			(user) =>
				user.email === emailUserRegistered &&
				user.password === passwordUserRegistered,
		);
		if (userFind === null) {
			return null;
		} else {
			return userFind;
		}
	}
}

btnCrossLogin.addEventListener("click", closeModalLogin);

function closeModalLogin() {
	loginForm.classList.add("close");
	loginForm.classList.remove("open");
	wrapperModal.classList.remove("wrapper-modal_open");
	document.body.style.overflow = "auto";
}

registerFormLink.addEventListener("click", openRegisterForm);

buyButtons.forEach(function(button) {
  button.addEventListener("click", openLoginForm);
});

function openRegisterForm() {
	if (loginForm.classList.contains("open")) {
		loginForm.classList.remove("open");
		loginForm.classList.add("close");
	}
	registerForm.classList.add("open");
	registerForm.classList.remove("close");
	wrapperModal.classList.add("wrapper-modal_open");
	document.body.style.overflow = "hidden";
	menuProfileNonauth.classList.add("close");
	menuProfileNonauth.classList.remove("open");
}
// modal login end //

regBtn.addEventListener("click", openRegisterForm);

//ADD CLOSING NONAUTH MENU! добавить закрытие меню для неавторизованных

function closeRegisterForm() {
	registerForm.classList.add("close");
	registerForm.classList.remove("open"); //code doesn't work
	wrapperModal.classList.remove("wrapper-modal_open");
	document.body.style.overflow = "auto";
}

btnCrossRegister.addEventListener("click", closeRegisterForm);

loginFormLink.addEventListener("click", openLoginForm);


// logout button// it works!
logOutBtn.addEventListener("click", fullLogOut);
function fullLogOut() {
	closeMenuProfileNonauth();
	logOut();
	svgProfileIcon.classList.remove("closeSvg");

	btnIcon.classList.add("open");
	btnIcon.classList.remove("close");
	buttonInits.classList.remove("open");
	buttonInits.classList.add("close");
}

function closeMenuProfileNonauth() {
	menuProfileAuth.classList.remove("open");
	menuProfileAuth.classList.add("close");
}

btnProfile.addEventListener("click", openModalProfile);
function openModalProfile() {
	modalProfile.classList.remove("close");
	modalProfile.classList.add("open");
	menuProfileAuth.classList.remove("open");
	menuProfileAuth.classList.add("close");
	wrapperModal.classList.add("wrapper-modal_open");
	document.body.style.overflow = "hidden";

	//new code//
	/*
	const nameUserRegistered = resultUserRegister.name;
	const familyNameUserRegistered = resultUserRegister.familyName;
	const profileIconName =
			nameUserRegistered[0].toUpperCase() +
			"." +
			familyNameUserRegistered[0].toUpperCase();
			userAvatarInitials.textContent = profileIconName;

	const fullUserName = nameUserRegistered + " " + familyNameUserRegistered;
			*/

}



crossProfile.addEventListener("click", closeModalProfile);

function closeModalProfile() {
	modalProfile.classList.remove("open");
	modalProfile.classList.add("close");
	wrapperModal.classList.remove("wrapper-modal_open");
	document.body.style.overflow = "auto";
}

checkCard.addEventListener("click", openLibraryCardCheck);
function openLibraryCardCheck() {
	libraryCardNotchecked.classList.remove("open");
	libraryCardNotchecked.classList.add("close");
	libraryCardChecked.classList.remove("close");
	libraryCardChecked.classList.add("open");
}

profileBtnLink.addEventListener("click", openModalProfile);
function openLoginForm() {
	loginForm.classList.remove("close");
	loginForm.classList.add("open");
	registerForm.classList.add("close");
	registerForm.classList.remove("open");
	// wrapperModal.classList.add("wrapper-modal_open");
	document.body.style.overflow = "hidden";
}
signUpRegister.addEventListener("click", userRegister);
function userRegister() {
	const name = registerName.value;
	const familyName = registerFamilyName.value;
	const objectUser = createObjectUserData(
		name,
		familyName,
		registerEmail.value,
		registerPassword.value,
	);
	const userInfoIncluded = localStorage.getItem(USER_INFO); //
	if (userInfoIncluded === null) {
		const storedInfo = JSON.stringify([objectUser]); //
		localStorage.setItem(USER_INFO, storedInfo);
	} else {
		const parsedUserInfoArr = JSON.parse(userInfoIncluded);
		parsedUserInfoArr.push(objectUser);
		const convertArrayToString = JSON.stringify(parsedUserInfoArr);
		localStorage.setItem(USER_INFO, convertArrayToString);
	}
	const profileIconName =
		name[0].toUpperCase() + "." + familyName[0].toUpperCase();
	svgProfileIcon.classList.add("closeSvg");
	btnIcon.classList.remove("open");
	btnIcon.classList.add("close");
	buttonInits.classList.remove("close");
	buttonInits.classList.add("open");
	//  btnIcon.textContent = buttonInits;
	//  btnIcon.classList.add('login-auth');
	buttonInits.textContent = profileIconName;

	wrapperModal.classList.remove("wrapper-modal_open");
	document.body.style.overflow = "auto";
	closeRegisterForm();
	logIn();
}

function createObjectUserData(name, familyName, email, password) {
	const userObject = {
		name,
		familyName,
		email,
		password,
	};
	return userObject;
}
buttonInits.addEventListener("click", openModal);

//favorites seasons buttons start//
const btnRadioWinter = document.getElementById("inputRadioWinter");
const btnRadioSpring = document.getElementById("inputRadioSpring");
const btnRadioSummer = document.getElementById("inputRadioSummer");
const btnRadioFall = document.getElementById("inputRadioFall");

const winterBooks = document.getElementById('winterBooksDiv');
const springBooks = document.getElementById('springBooksDiv');
const summerBooks = document.getElementById('summerBooksDiv');
const fallBooks = document.getElementById('fallBooksDiv');

//favorites seasons buttons end//





