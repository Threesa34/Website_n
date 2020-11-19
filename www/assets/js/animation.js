var tl = new TimelineMax();
console.log(tl)
	tl.from('#4', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})