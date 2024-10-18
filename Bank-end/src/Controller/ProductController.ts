import { Request, Response, NextFunction } from 'express';
import ProductModel from '../Modals/ProductModel';

export default class ProductController {
  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, stock } = req.body;
      const product = new ProductModel({ name, description, price, stock });
      await product.save();
      res.status(201).json({ message: 'Product created', product });
    } catch (err) {
      next(err);
    }
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductModel.find();
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      next(err);
    }
  }
}
