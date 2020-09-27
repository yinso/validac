__ = $(if $(filter Windows_NT,$(OS)),\\,/)
SOURCE_JS := $(wildcard lib/*.js lib/*/*.js test/*.js test/*/*.js)
DIST_JS = $(patsubst %.js,dist/%.js,$(SOURCE_JS))

tsc-only:
	# requires windows delim
	.$(__)node_modules$(__).bin$(__)tsc

dist/%.js: %.js
	dirname $< | mkdir -p -
	cp $< $@

js: $(DIST_JS)

dist: tsc-only js
	cp README.md ./dist
	cp package.json package-lock.json
	rm -rf ./dist/node_modules
	cd dist && npm ci
