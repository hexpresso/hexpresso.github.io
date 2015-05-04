<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>TermDesign</title>
	<link href='http://fonts.googleapis.com/css?family=Cousine:400,700' rel='stylesheet' type='text/css'>
	<link href="styles/main.css" media="screen, projection" rel="stylesheet" type="text/css" />
	<link href="styles/shjs.css" rel="stylesheet" type="text/css" />
	<!--[if IE]>
		<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
	<![endif]-->
</head>
<body onload="sh_highlightDocument('scripts/languages/', '.js');">
	<div id="overLogo" lol="I know, this is dirty.">
		<header>
			<canvas id="logo" width="900px" height="180px" data-title="Hexpresso"></canvas>
			<ul id="menu">
				<li><a href="#" class="active">Home</a></li>
				<li><a href="#">Lol</a></li>
				<li><a href="#">TheGame</a></li>
				<li><a href="#">Palindrome</a></li>
			</ul>
		</header>
		<div id="main">
			<div class="bill">
				<h2>My first bill<span class="date">[01/04]</span></h2>
				<div class="content">
					<h3>Wanna hack ?</h3>
					<p>Perspiciatis necessitatibus aut eveniet voluptas vitae adipisci laborum similique molestias, aspernatur sunt, suscipit labore, deleniti voluptates. Necessitatibus quaerat dolore iusto aliquam omnis, deleniti atque accusantium deserunt in, eius, porro fugit soluta voluptates eaque nobis veniam error et quod nemo laborum, vitae eligendi <a href="#">ducimus</a> corporis ut doloremque, magnam nihil voluptate id dignissimos quidem! Dolore deserunt, praesentium aspernatur eligendi atque dolores quod.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates molestiae architecto amet aspernatur, perspiciatis sunt <a href="#">voluptas</a> dolorum repellendus quod alias quaerat quis fuga, illum magni! Pariatur ea laudantium nisi sit.</p>
					<pre class="sh_python">#!/usr/bin/env python2
from PIL import Image
import os

arr = [0xa3, 0x9f, 0x67, 0x9d, 0xad, 0x88, 0xa1, 0x66, 0x44, 0x50, 0x33]

im = Image.new(&quot;RGB&quot;, (100, 100))
i = 0
c = 0

while (i &lt; len(arr)):
	r = arr[i]
	g = arr[i + 1]
	b = arr[i + 2]
	im.putpixel((c, 0), (r, g, b))
	i += 3
	c += 1

im.save(&quot;haex.png&quot;) #or whatever you want to call it
#end of file</pre>
					<ul>
						<li>0xdeadbeef</li>
						<li>loln00b</li>
						<li>kickban</li>
						<li>palindrome</li>
					</ul>
					<h3>Intrenet is fro pr0n !</h3>
					<p>Perspiciatis necessitatibus aut eveniet voluptas vitae adipisci laborum similique molestias, aspernatur sunt, suscipit labore, deleniti voluptates. Necessitatibus quaerat dolore iusto aliquam omnis, deleniti atque accusantium deserunt in, eius, porro fugit <a href="#">soluta</a> voluptates eaque nobis veniam error et quod nemo laborum, vitae eligendi ducimus corporis ut doloremque, magnam nihil voluptate id dignissimos quidem! Dolore deserunt, praesentium aspernatur eligendi atque dolores quod.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing <span class="info" title="Hexpresso ?">1337</span>. Voluptates molestiae architecto amet aspernatur, perspiciatis sunt voluptas dolorum repellendus quod alias quaerat quis fuga, illum magni! Pariatur ea laudantium nisi sit.</p>
					<p>Perspiciatis necessitatibus aut eveniet voluptas vitae adipisci laborum similique molestias, aspernatur sunt, suscipit labore, deleniti voluptates. Necessitatibus quaerat dolore iusto aliquam omnis, deleniti atque accusantium deserunt in, eius, porro fugit soluta voluptates eaque nobis veniam error et quod nemo laborum, vitae eligendi ducimus corporis ut doloremque, magnam nihil voluptate id dignissimos quidem! Dolore deserunt, praesentium aspernatur eligendi atque dolores quod.</p>
				</div>
			</div>
		</div>
	</div>
	<footer>
		Hexpresso 2015 - design by zM
	</footer>
	<script src="scripts/jquery.js"></script>
	<script src="scripts/jcanvas.js"></script>
	<script src="scripts/shjs.js"></script>
	<script src="scripts/letters.json"></script>
	<script src="scripts/logo.js"></script>
	<script src="scripts/main.js"></script>
</body>
</html>