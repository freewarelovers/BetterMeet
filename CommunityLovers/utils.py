from functools import wraps


def context(f):
    def _context(func):
        def wrapper(*args, **kwargs):
            info = args[f.__code__.co_varnames.index('info')]
            return func(info.context, *args, **kwargs)
        return wrapper
    return _context


def login_required(f):
    @wraps(f)
    @context(f)
    def wrapper(context, *args, **kwargs):
        if context.user.is_anonymous:
            raise Exception('Authentication credentials were not provided')
        return f(*args, **kwargs)
    return wrapper


def staff_member_required(f):
    @wraps(f)
    @context(f)
    def wrapper(context, *args, **kwargs):
        user = context.user
        if user.is_active and user.is_staff:
            return f(*args, **kwargs)
        raise Exception('You do not have permission to perform this action')
    return wrapper