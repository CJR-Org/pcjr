compile:
	deno compile --allow-read --allow-write --allow-run --allow-net pcjr.js

install: compile
	mv pcjr /usr/bin

clean:
	rm -rf modules
	rm -rf *.json