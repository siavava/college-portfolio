# Makefile for the college portfolio site
#
# Author: Amittai (@siavava)

# If the first argument is "update"...
ifeq (update,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "update"
  UPDATE_EXTRA := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UPDATE_EXTRA):;@:)
endif

all: build

.PHONY: build dev generate preview clean install lint audit update

build:
	@bun run build

dev:
	@bun run dev

generate:
	@bun run generate

preview:
	@bun run preview

clean:
	@rm -rf .output .data .nuxt dist node_modules/.cache

install:
	@bun install

lint:
	@bun run lint

audit:
	@bun audit

update:
	@bun update $(UPDATE_EXTRA)
