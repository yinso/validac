__ = $(if $(filter Windows_NT,$(OS)),\\,/)
DIST_DIR := ./dist
SOURCE_JS := $(wildcard lib/*.js lib/*/*.js)
DIST_JS = $(patsubst %.js,$(DIST_DIR)/%.js,$(SOURCE_JS))
SOURCE_DTS := $(wildcard lib/*.d.ts lib/*/*.d.ts)
DIST_DTS = $(patsubst %.d.ts,$(DIST_DIR)/%.d.ts,$(SOURCE_DTS))
SOURCE_JSMAP := $(wildcard lib/*.js.map lib/*/*.js.map)
DIST_JSMAP = $(patsubst %.js.map,$(DIST_DIR)/%.js.map,$(SOURCE_JSMAP))

tsc-only:
	# requires windows delim
	.$(__)node_modules$(__).bin$(__)tsc

$(DIST_DIR)/%.js: %.js
	dirname $< | mkdir -p -
	cp $< $@

js: $(DIST_JS)

$(DIST_DIR)/%.d.ts: %.d.ts
	dirname $< | mkdir -p -
	cp $< $@

dts: $(DIST_DTS)

$(DIST_DIR)/%.js.map: %.js.map
	dirname $< | mkdir -p -
	cp $< $@

jsmap: $(DIST_JSMAP)

dist: tsc-only
	mkdir -p $(DIST_DIR)/{lib,lib/types,lib/util,test,test/types,test/util}
	$(MAKE) js dts jsmap
	cp README.md $(DIST_DIR)
	cp package.json package-lock.json $(DIST_DIR)
	# cd $(DIST_DIR) && npm ci

clean:
	rm -rf $(DIST_DIR)
