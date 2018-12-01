# 🎄

Solving [Advent of Code 2018](https://adventofcode.com/) as [OpenFaaS](https://www.openfaas.com/) functions

## New Function

```
faas-cli new -a stack.yml --lang node -p regisry-url --handler i aoc18-i
```

## Run a Function

Copy the input to the clipboard first.

```
pbpaste | faas-cli invoke aoc18-i

# or

pbpaste | curl --data-binary "@-" https://openfaas-gateway/function/aoc18-i
```
