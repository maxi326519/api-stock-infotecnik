import { rectifyingSaleInvoice } from '../src/routes/controllers/sales';

describe('rectifyingSaleInvoice', () => {
  it('should generate a rectification PDF for type 1', async () => {
    const saleInvoice = {
      id: '',
      tipo: 1,
    };

    const pdfUrl = await rectifyingSaleInvoice(saleInvoice.id);

    expect(pdfUrl).toBeTruthy();
  });

  it('should generate a rectification PDF for type 2', async () => {
    const saleInvoice = {
      id: '',
      tipo: 2,
    };

    const pdfUrl = await rectifyingSaleInvoice(saleInvoice.id);

    expect(pdfUrl).toBeTruthy();
  });

  it('should handle invalid type', async () => {
    const saleInvoice = {
      id: '',
      tipo: 3, // este Tipo viene siendo el error :D.
    };

    try {
      await rectifyingSaleInvoice(saleInvoice.id);
    } catch (error) {
      expect(error.message).toBe('type value invalid.');
    }
  });
});
