#!/bin/bash
source ./.env
input="./source.txt"
last_line=$(<./source.txt wc -l)
current_line=0
IFS='|' read -r -a processed_viewports <<< "${viewports}"
viewports_len=${#processed_viewports[@]}
viewports_cont=0
echo '{
  "id": "backstop_default",
  "viewports": [' > backstop.json
    for element in "${processed_viewports[@]}"; do
        viewports_cont=$(($viewports_cont + 1))

        IFS='x' read -r -a dimensions <<< "$element"
        echo "{
            \"label\": \"${element}\",
            \"width\": ${dimensions[0]},
            \"height\": ${dimensions[1]}
        " >> backstop.json
        if [[ $viewports_cont -ne $viewports_len ]]; then 
            echo "}," >> backstop.json
        else
            echo "}" >> backstop.json
        fi
    done
echo '],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [' >> backstop.json
while read -r line; do
current_line=$(($current_line + 1))
echo "{
        \"label\": \"Page ${line}\",
        \"cookiePath\": \"backstop_data/engine_scripts/cookies.json\",
        \"url\": \"${reference}${line}\",
        \"referenceUrl\": \"${source}${line}\",
        \"readyEvent\": \"\",
        \"readySelector\": \"\",
        \"delay\": 10000,
        \"hideSelectors\": [],
        \"removeSelectors\": [],
        \"hoverSelector\": \"\",
        \"clickSelector\": \"\",
        \"postInteractionWait\": 0,
        \"selectors\": [],
        \"selectorExpansion\": true,
        \"expect\": 0,
        \"misMatchThreshold\" : 0.1,
        \"requireSameDimensions\": true" >> backstop.json
if [[ $current_line -ne $last_line ]]; then 
    echo "}," >> backstop.json
else
    echo "}" >> backstop.json
fi
done < "$input"

echo '],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}' >> backstop.json

backstop reference 
backstop test