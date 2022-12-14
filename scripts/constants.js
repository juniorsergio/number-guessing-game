const lowerLimit = 1
const upperLimit = 300

const ledDisplayColor = {
    success: 'var(--success)',
    error: 'var(--error)',
    active: 'var(--gray-800)',
    disabled: 'var(--gray-100)'
}

const ledLight = {
    top: {
        above: ['0', '2', '3', '5', '6', '7', '8', '9'],
        topLeft: ['0', '4', '5', '6', '8', '9'],
        topRight: ['0', '1', '2', '3', '4', '7', '8', '9']
    },
    middle: {
        middle: ['2', '3', '4', '5', '6', '8', '9']
    },
    bottom: {
        below: ['0', '2', '3', '5', '6', '8', '9'],
        bottomLeft: ['0', '2', '6', '8'],
        bottomRight: ['0', '1', '3', '4', '5', '6', '7', '8', '9']
    }
}

const textDisplay = {
    success: {
        id: 'success',
        text: 'Você acertou!!!',
        color: 'var(--success)'
    },

    error: {
        id: 'error',
        text: 'ERRO',
        color: 'var(--error)'
    },

    less: {
        id: 'less',
        text: 'É menor',
        color: 'var(--primary-light)'
    },

    greater: {
        id: 'greater',
        text: 'É maior',
        color: 'var(--primary)'
    },

    default: {
        id: 'default',
        text: '',
        color: 'var(--primary)'
    }
}