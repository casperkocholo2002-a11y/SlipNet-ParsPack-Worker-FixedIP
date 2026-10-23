# SlipNet ParsPack Worker Fixed IP

مسیر مستقل شماره ۳:

User -> Dedicated ParsPack App -> Dedicated Cloudflare Worker -> Dedicated Origin Domain -> 155 -> Internet

خروجی اینترنت این مسیر باید از سرور 155 انجام شود تا IP مقصد همان IP ثابت سرور 155 را ببیند.

## ParsPack env

- PUBLIC_RELAY_PATH
- WORKER_HOST
- WORKER_PATH

## Worker env

- PUBLIC_PATH
- FIXED_ORIGIN_HOST
- FIXED_ORIGIN_PATH

FIXED_ORIGIN_HOST باید دامنه جدید و مستقل مخصوص همین مسیر باشد. از forexcsp و csp.online استفاده نشود.

## قوانین جداسازی

- اپ ParsPack مستقل از مسیر 95 و مسیر Direct فعلی باشد.
- Worker مستقل و path مستقل داشته باشد.
- origin domain مستقل داشته باشد.
- ingress روی 155 مستقل باشد.
- UUID کاربر در ingress همین مسیر مدیریت شود.
- هیچ secret، UUID یا hostname زنده داخل Git commit نشود.

اگر Custom Domain برای ParsPack استفاده می‌شود، برای بیشترین استقلال در برابر فیلترینگ، root domain آن هم با مسیرهای دیگر متفاوت باشد.
