import { z } from 'zod';
export const openUISchema = z.object({
    width: z.number().positive(),
    height: z.number().positive(),
});
//# sourceMappingURL=open-ui-options.schema.js.map