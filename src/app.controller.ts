import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CicaDto } from './cica.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Get()
  @Render('list')
  async listcicak() {
    const [rows] = await db.execute('SELECT suly, szem_szin FROM macskak ORDER BY suly DESC ');
    return {
      cicak: rows,
    };
  }

  @Get('cicak/new')
  @Render('form')
  newCicaForm() { 
    return {};
  }
  
  @Get('/:szem_szin')
  @Render('list')
  async cicaSearch(@Param('szem_szin') szem_szin: string)  {
    const [rows] = await db.execute(
      'SELECT suly, szem_szin FROM macskak WHERE szem_szin LIKE ?',[szem_szin],
    );
  
    return { cicak: rows };
  }




  @Post('cicak/new')
  @Redirect()
  async newCica(@Body() cica: CicaDto)  {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [cica.suly, cica.szem_szin],
    );
    return {
      url: '/',
    };
  }

}
