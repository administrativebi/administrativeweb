import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('web_ier_diagnostics')
      .select('dim_financeira, dim_custos, dim_processos, dim_pessoas, dim_comercial, dim_experiencia, dim_dados, dim_lideranca, score_total');

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({
        general: 0,
        dims: [0, 0, 0, 0, 0, 0, 0, 0],
        total: 0
      });
    }

    const count = data.length;
    const totals = data.reduce((acc, curr) => {
      acc.financeira += curr.dim_financeira || 0;
      acc.custos += curr.dim_custos || 0;
      acc.processos += curr.dim_processos || 0;
      acc.pessoas += curr.dim_pessoas || 0;
      acc.comercial += curr.dim_comercial || 0;
      acc.experiencia += curr.dim_experiencia || 0;
      acc.dados += curr.dim_dados || 0;
      acc.lideranca += curr.dim_lideranca || 0;
      acc.score_total += curr.score_total || 0;
      return acc;
    }, {
      financeira: 0, custos: 0, processos: 0, pessoas: 0, comercial: 0, experiencia: 0, dados: 0, lideranca: 0, score_total: 0
    });

    const averages = [
      Math.round(totals.financeira / count),
      Math.round(totals.custos / count),
      Math.round(totals.processos / count),
      Math.round(totals.pessoas / count),
      Math.round(totals.comercial / count),
      Math.round(totals.experiencia / count),
      Math.round(totals.dados / count),
      Math.round(totals.lideranca / count)
    ];

    const generalAverage = Math.round(totals.score_total / count);

    return NextResponse.json({
      general: generalAverage,
      dims: averages,
      total: count
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
