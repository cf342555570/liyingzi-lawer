@echo off
setlocal

if "%~1"=="" (
  echo 请把母版文章 .md 或 .txt 文件拖到这个 bat 上运行。
  echo.
  echo 或者命令行运行：
  echo python "%~dp0rewrite_article.py" "你的文章.md"
  pause
  exit /b 1
)

cd /d "%~dp0..\.."
python "%~dp0rewrite_article.py" "%~1"
pause
