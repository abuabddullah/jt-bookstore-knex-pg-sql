import { Knex } from 'knex';

interface QueryOptions {
    page?: number;
    limit?: number;
    search?: string;
    searchColumns?: string[];
    fields?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
}

export async function queryWithFeatures<T = any>(
    knexQuery: Knex.QueryBuilder,
    options: QueryOptions = {}
): Promise<{ data: T[]; pagination: any }> {
    const {
        page,
        limit,
        search,
        searchColumns = [],
        fields = [],
        sortBy,
        sortOrder = 'asc',
        filters = {}
    } = options;

    let query = knexQuery.clone();

    // Early return: if search is provided but no searchColumns are defined
    if (search && searchColumns.length === 0) {
        return {
            data: [],
            pagination: {
                total: 0,
                page: page ?? 1,
                limit: limit ?? 0,
                totalPages: 0
            }
        };
    }

    if (fields.length > 0) {
        query = query.select(fields);
    }

    // Search filter
    if (search && searchColumns.length > 0) {
        query = query.where(builder => {
            searchColumns.forEach(col => {
                builder.orWhere(col, 'ilike', `%${search}%`);
            });
        });
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query = query.where(key, value);
        }
    });

    const countQuery = query.clone().clearSelect().count({ count: '*' }).first();
    const countResult = await countQuery;
    const total = parseInt((countResult?.count as string) || '0', 10);

    let currentPage = page ?? 1;
    let perPage = limit ?? total;

    if (sortBy) {
        query = query.orderBy(sortBy, sortOrder);
    }

    if (limit && page) {
        const offset = (page - 1) * limit;
        query = query.limit(limit).offset(offset);
    }

    const data = await query;

    const pagination = {
        total,
        page: currentPage,
        limit: perPage,
        totalPages: perPage > 0 ? Math.ceil(total / perPage) : 1
    };

    return { data, pagination };
}

