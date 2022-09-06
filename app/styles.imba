global css .dark
	$appbg:#20222f
	$bodybg:#20222f
	$selected-c:blue3/5
	$bang-c:#fad4ab
	$text-c:blue3
	$input-bg:purple4/10
	$input-c:blue3
	$input-caret-c:blue3
	$input-bc:purple4
	$tip-hotkey-c:purple3/50
	$tip-content-c:purple3
	$tip-hover-c:purple3/3
	$tip-bc:blue3/10
	$button-c:purple3/90
	$button-dim-c:purple3/50
	$button-bg:purple4/10
	$button-hover-bg:purple4/20

global css .light
	$bodybg:#ececec
	$appbg:#fff
	$selected-c:blue5/7
	$bang-c:#ff7070
	$text-c:#3c3c3c
	$input-bg:blue4/10
	$input-c:blue3
	$input-caret-c:blue3
	$input-bc:blue4
	$tip-hotkey-c:blue4/80
	$tip-content-c:blue5
	$tip-hover-c:black/3
	$tip-bc:black/10
	$button-c:blue5/90
	$button-dim-c:blue5/50
	$button-bg:blue4/10
	$button-hover-bg:blue4/20

global css html
	$effective-name-c:gray4
	$effective-name-parens-c:gray4/80
	bg:#20222f

global css body
	m:0 bd:0 p:0
	bg:#20222f

global css input
	w:100% h:50px px:20px fl:1
	fs:20px ta:center
	bd:1px solid
	outline:none rd:5px
	bg:$input-bg
	bc:$input-bc
	c:$text-c
	caret-color:$input-caret-c

global css a
	td:none

global css .disabled *
	@important c:gray4 cursor:default user-select:none pointer-events:none

global css .disabled $main-input
	@important bg:gray4/10 bc:gray4

global css .selected
	bg:$selected-c

global css .ellipsis
	of:hidden text-overflow:ellipsis white-space:nowrap
