SERVER_NAME = '127.0.0.1:5000'

writings_schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
    'title': {
        'type': 'string',
    },
    'chapters': {
        'type': 'list',
    },
    'heroes': {
        'type': 'list',
    },
    'places': {
        'type': 'list',
    },
    'events': {
        'type': 'list',
    },
}

RESOURCE_METHODS = ['GET']
ITEM_METHODS = ['GET', 'DELETE']

IF_MATCH = False

DOMAIN = {
    'writings': {
        'schema': writings_schema,
        'resource_methods': ['GET', 'POST', 'DELETE'],
        'cache_control': 'max-age=10,must-revalidate',
        'cache_expires': 10,
    },
}