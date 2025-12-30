import { HttpResponse } from 'msw';
import type { ApiSchema } from '../../schema';
import { http } from '../http';
import { verifyTokenOrThrow } from '../session';

type SortOption = 'title' | 'createdAt' | 'updatedAt';

const forms: ApiSchema['Form'][] = generateRandomForms(1000);

// Get Forms List -------------------------------------------------
export const formsHandlers = [
  http.get('/forms', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    let filteredForms = [...forms];

    const url = new URL(ctx.request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 20);
    const search = url.searchParams.get('search');
    const filter = url.searchParams.get('filter');
    const sort = url.searchParams.get('sort') as SortOption;

    console.log(filter);

    // Фільтрація по пошуковому запиту
    if (search) {
      filteredForms = filteredForms.filter((form) => form.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort) {
      filteredForms = filteredForms.sort((a, b) => {
        if (sort === 'title') return a.title.localeCompare(b.title);
        return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
      });
    }

    if (filter && filter.length !== 0) {
      filteredForms = filteredForms.filter((form) => {
        if (filter.includes('isActive') && filter.includes('isPublic')) {
          return form.isPublic && form.isActive;
        }

        if (filter.includes('isActive')) {
          return form.isActive;
        }

        if (filter.includes('isPublic')) {
          return form.isPublic;
        }
      });
    }

    const total = filteredForms.length;
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginatedForms = filteredForms.slice(startIdx, endIdx);

    return HttpResponse.json(
      {
        total,
        list: paginatedForms,
        totalPages: total / limit,
      },
      { status: 200 },
    );
  }),

  // Get Form By ID -------------------------------------------------
  http.get('/forms/{formId}', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const formId = ctx.params.formId;
    const form = forms.find((form) => form.id === formId);

    if (!form) {
      return HttpResponse.json({ message: 'Form not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    return HttpResponse.json(form, { status: 200 });
  }),

  // Create New Form -------------------------------------------------
  http.post('/forms', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const body = await ctx.request.json();

    const newForm: ApiSchema['Form'] = {
      id: crypto.randomUUID(),
      isPublic: false,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...body,
    };

    forms.push(newForm);

    return HttpResponse.json(newForm, { status: 201 });
  }),

  // Update Form By ID -------------------------------------------------
  http.patch('/forms/{formId}', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const formId = ctx.params.formId;
    const form = forms.find((form) => form.id === formId);

    if (!form) {
      return HttpResponse.json({ message: 'Form not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    const data = await ctx.request.json();
    if (data.title) form.title = data.title;
    if (data.description) form.description = data.description;
    form.updatedAt = new Date().toISOString();

    return HttpResponse.json(form, { status: 200 });
  }),

  // Delete Form By ID -------------------------------------------------
  http.delete('/forms/{formId}', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const formId = ctx.params.formId;
    const idx = forms.findIndex((form) => form.id === formId);

    if (idx === -1) {
      return HttpResponse.json({ message: 'Form not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    forms.splice(idx, 1);
    return HttpResponse.json(null, { status: 204 });
  }),

  // Activate Form -------------------------------------------------
  http.patch('/forms/{formId}/active', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const formId = ctx.params.formId;
    const form = forms.find((form) => form.id === formId);

    if (!form) {
      return HttpResponse.json({ message: 'Form not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    form.isActive = !form.isActive;

    return HttpResponse.json(form, { status: 200 });
  }),

  // Public Form -------------------------------------------------
  http.patch('/forms/{formId}/public', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const formId = ctx.params.formId;
    const form = forms.find((form) => form.id === formId);

    if (!form) {
      return HttpResponse.json({ message: 'Form not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    form.isPublic = !form.isPublic;

    return HttpResponse.json(form, { status: 200 });
  }),
];

function generateRandomFormTitle() {
  const FORM_ADJECTIVES = [
    'Опитувальна',
    'Реєстраційна',
    'Анкетна',
    'Тестова',
    'Збірна',
    'Інформаційна',
    'Оціночна',
    'Аналітична',
    'Дослідницька',
    'Статистична',
    'Маркетингова',
    'Соціологічна',
  ];
  const FORM_NOUNS = [
    'форма',
    'анкета',
    'опитування',
    'тест',
    'реєстрація',
    'дослідження',
    'збір даних',
    'оцінка',
    'аудит',
    'перевірка',
    'опрос',
    'зворотний звʼязок',
  ];
  const FORM_THEMES = [
    'якості',
    'задоволеності',
    'ефективності',
    'продуктивності',
    'лояльності',
    'потреб',
    'переваг',
    'звичок',
    'поведінки',
    'думки',
    'знань',
    'навичок',
  ];

  const adjective = FORM_ADJECTIVES[Math.floor(Math.random() * FORM_ADJECTIVES.length)];
  const noun = FORM_NOUNS[Math.floor(Math.random() * FORM_NOUNS.length)];
  const theme = FORM_THEMES[Math.floor(Math.random() * FORM_THEMES.length)];

  return `${adjective} ${noun} ${theme}`;
}

function generateRandomDate() {
  const start = new Date();
  start.setDate(start.getDate() - 30);

  const end = new Date();

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateRandomForms(count: number): ApiSchema['Form'][] {
  const forms: ApiSchema['Form'][] = [];

  for (let i = 1; i <= count; i += 1) {
    const createdAt = generateRandomDate();
    const updatedAt = new Date(new Date(createdAt).getTime() + Math.random() * 86400000 * 10).toISOString();
    const title = generateRandomFormTitle();

    forms.push({
      id: crypto.randomUUID(),
      title,
      description: 'Опис для форми ' + title,
      isActive: Math.random() >= 0.5,
      isPublic: Math.random() >= 0.5,
      createdAt,
      updatedAt,
    });
  }

  return forms;
}
