#!/bin/bash
rm -rf kingtest.ddhi.cn && rm -rf kingtest.ddhi.cn.zip  && npm run build:stage && zip -r kingtest.ddhi.cn.zip kingtest.ddhi.cn && zssh t1 up kingtest.ddhi.cn.zip /www
