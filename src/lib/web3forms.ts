const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

/** Web3Forms expects string values; booleans become yes/no. */
function stringifyFields(data: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue
    out[key] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : String(value)
  }
  return out
}

/**
 * POST to Web3Forms. Access keys are intended for client-side use per Web3Forms docs.
 * @see https://web3forms.com
 */
export async function submitWeb3Form(
  accessKey: string,
  payload: Record<string, unknown>,
): Promise<{ message?: string }> {
  const body = {
    access_key: accessKey,
    ...stringifyFields(payload),
  }

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }

  if (!res.ok) {
    throw new Error(data.message || `Form service error (${res.status})`)
  }
  if (data.success === false) {
    throw new Error(data.message || 'Form submission was rejected.')
  }

  return data
}
