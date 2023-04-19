function expandMenu() {
	if (document.getElementsByClassName("menu")[0].classList.contains("menu-anim-collapse")) {
		document.getElementsByClassName("menu")[0].classList.remove("menu-anim-collapse");
	}
	document.getElementsByClassName("menu")[0].classList.add("menu-anim-expand");
}

function collapseMenu() {
	if (document.getElementsByClassName("menu")[0].classList.contains("menu-anim-expand")) {
		document.getElementsByClassName("menu")[0].classList.remove("menu-anim-expand");
	}
	document.getElementsByClassName("menu")[0].classList.add("menu-anim-collapse");
}


menu_button_expand = document.getElementsByClassName("menu-icon")[0];
menu_button_expand.addEventListener("click", expandMenu);

menu_button_collapse = document.getElementsByClassName("close-menu-icon")[0];
menu_button_collapse.addEventListener("click", collapseMenu);