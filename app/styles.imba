global css body
	d:flex fld:column jc:start ai:center
	m:0 w:100% h:100% bg:#20222f
	ff:sans-serif fw:1
	user-select:none

global css input
	w:100% h:50px px:20px fl:1
	fs:20px ta:center
	bd:1px solid purple4
	bg:purple4/10 c:blue3 caret-color:blue3
	outline:none rd:5px

global css a
	td:none

global css .disabled *
	@important c:gray4 cursor:default user-select:none pointer-events:none

global css .disabled $main-input
	@important bg:gray4/10 bc:gray4

global css .selected
	bg:blue3/5

global css .ellipsis
	of:hidden text-overflow:ellipsis white-space:nowrap
