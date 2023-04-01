import camelcase from 'camelcase'

export function parseDataset<T = any>(el: HTMLElement): T {
    const dataset: T = {} as any

    const types = ['bool', 'csv', 'float', 'int', 'json', 'string']

    for (const attributeName of el.getAttributeNames()) {
        const parts = attributeName.split('-')

        if (parts[0] !== 'data') continue

        const hastype = types.includes(parts[1])

        const key = camelcase(parts.slice(hastype ? 2 : 1).join('-'))
        const value = cast(el.getAttribute(attributeName), parts[1])

        dataset[key] = value
    }

    return dataset
}

function cast(value: any, castTo: string) {
    switch (castTo) {
        case 'bool':
            return Boolean(value)
        case 'csv':
            return (value as string).split(',')
        case 'float':
            return parseFloat(value)
        case 'int':
            return parseInt(value)
        case 'json':
            return JSON.parse(value)
        default:
            return value
    }
}
