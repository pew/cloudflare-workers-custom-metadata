# Workers & Cloudflare for SaaS: Read Custom Metadata

This is an example Cloudflare Worker to access custom metadata from [Cloudflare for SaaS Custom Hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/)

## Usage

- patch custom hostname with custom metadata (customer_id in this example), replace `<zone_id>` and `<custom_hostname_uuid>` with your own data:

```shell
curl --location --request PATCH 'https://api.cloudflare.com/client/v4/zones/<zone_id>/custom_hostnames/<custom_hostname_uuid_>' \
--header 'X-Auth-Email: you@example.com' \
--header 'X-Auth-Key: t0p-secret' \
--header 'Content-Type: application/json' \
--data '{
    "ssl": {
        "method": "http",
        "type": "dv"
    },
    "custom_metadata": {
        "customer_id": "e0a740fb-1764-4330-bc05-c0a05fc34b89",
        "redirect_to_https": true
    }
}'
```

- clone this repo
- deploy your Worker:

```shell
npm run deploy
```

- Map your custom hostname to your Worker using either a [Custom Domain](https://developers.cloudflare.com/workers/platform/triggers/custom-domains/) or [Workers Route](https://developers.cloudflare.com/workers/platform/triggers/routes/)
- Profit! [Access your Custom Hostname and look for your header](https://hb.bounty.cat/headers)

```json
{
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip",
    "Accept-Language": "en-US,en;q=0.9",
    "Cf-Ipcity": "Munich",
    "Cf-Ipcontinent": "EU",
    "Cf-Ipcountry": "DE",
    "Cf-Iplatitude": "48.15370",
    "Cf-Iplongitude": "11.52690",
    "X-Customer-Id": "e0a740fb-1764-4330-bc05-c0a05fc34b89"
  }
}
```
