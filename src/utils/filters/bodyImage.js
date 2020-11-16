
/*
* Filter used for rendering images stored in cloudinary to the HTML page
*/
module.exports = function(content) {
	var regExp =/(<p>)<img src="([\S]*?)" alt="([\S\s]*?)"( title="([\S\s]*?)")?>(<\/p>)/g;
	let pics = [...content.val.matchAll(regExp)];
	if(pics.length > 0) {
		for(i=0;i<pics.length;i++) {
			let pic = "<figure><picture><source srcset=\"https://res.cloudinary.com/cbs1916/image/upload/w_379/covid" + pics[i][2] + ", https://res.cloudinary.com/cbs1916/image/upload/w_758/covid/" + pics[i][2] + " 2x\" media=\"(max-width: 568px)\"><source srcset=\"https://res.cloudinary.com/cbs1916/image/upload/w_569/covid" + pics[i][2] + ", https://res.cloudinary.com/cbs1916/image/upload/w_1138/covid/" + pics[i][2] + " 2x\" media=\"(min-width: 569px)\"><source srcset=\"https://res.cloudinary.com/cbs1916/image/upload/w_854/covid" + pics[i][2] + ", https://res.cloudinary.com/cbs1916/image/upload/w_1334/covid/" + pics[i][2] + " 2x\" media=\"(min-width: 854px)\"><img loading=\"lazy\" src=\"https://res.cloudinary.com/cbs1916/image/upload/w_379/covid" + pics[i][2] + "\" alt=\"" + pics[i][3] + "\" class=\"\" onload=\"this.classList.add('is-loaded')\"></picture>";
			if(typeof pics[i][5] === "string") {
				pic += "<figcaption><p>" + pics[i][5] + "<\/p><\/figcaption>";
			}
			pic += "</figure>";
			let res = content.val.replace(pics[i][0],pic);
			content.val = res;
		}
	}
	return content;
}