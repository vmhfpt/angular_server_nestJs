import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {UploadedFile,  UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './handleFile/config';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('filter')
  findByFilter(@Query() query: any) {
     return this.productsService.findByFilter(query);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('product-suggest')
  getProductSuggest(@Query() query: any) {
    return this.productsService.getProductSuggest(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Get('detail/:id')
  getDetail(@Param('id') id: string) {
     return this.productsService.findOneById(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file : any) {
    const response = {
      status: 'upload success',
      nameFile: file.filename,
    };
    return response;
  }

  @Get(':imgpath')
     seeUploadedFile(@Param('imgpath') image : any, @Res() res : Response) {
    return res.sendFile(image, { root: './files' });
  }

  @Post('delete-file')
  deleteImage(@Body('image') image: string) {
    fs.unlink( join(__dirname, '..', '..', 'files', image),(err) => {});
  
  }

  
}
