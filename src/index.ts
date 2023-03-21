export default {
  async fetch(request: Request): Promise<Response> {
    const cf = request.cf

    const customerId = cf.hostMetadata.customer_id
    const newHeaders = new Headers(request.headers)
    newHeaders.append('X-Customer-Id', customerId)

    const init = {
      headers: newHeaders,
      method: request.method,
    }

    const response = await fetch(request.url, init)
    return response
  },
}
