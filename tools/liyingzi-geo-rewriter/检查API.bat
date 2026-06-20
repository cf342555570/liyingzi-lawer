@echo off
cd /d "%~dp0..\.."
python "%~dp0rewrite_article.py" --check
pause
