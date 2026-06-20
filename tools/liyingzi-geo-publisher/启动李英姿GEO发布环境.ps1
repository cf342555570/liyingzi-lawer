$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profile = 'C:\Users\34255\Documents\GEO 2\.chrome-profiles\liyingzi-geo-publish'

if (-not (Test-Path $chrome)) {
  Write-Host "Chrome was not found at: $chrome"
  Read-Host "Press Enter to exit"
  exit 1
}

New-Item -ItemType Directory -Path $profile -Force | Out-Null

$urls = @(
  'https://chromewebstore.google.com/detail/%E6%96%87%E7%AB%A0%E5%90%8C%E6%AD%A5%E5%8A%A9%E6%89%8B/hchobocdmclopcbnibdnoafilagadion',
  'https://www.wechatsync.com/',
  'https://mp.weixin.qq.com/',
  'https://www.zhihu.com/creator',
  'https://mp.toutiao.com/',
  'https://baijiahao.baidu.com/',
  'https://creator.xiaohongshu.com/'
)

$args = @(
  "--user-data-dir=""$profile""",
  '--profile-directory=Default',
  '--new-window',
  '--no-first-run',
  '--disable-features=Translate'
) + $urls

Start-Process -FilePath $chrome -ArgumentList $args
