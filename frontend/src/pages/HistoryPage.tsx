import React, { useEffect, useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, RefreshCw, FileText, Download, Wallet, ArrowUpRight, History as HistoryIcon, ShieldCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const HistoryPage = () => {
  const { getHistory, history, isLoading } = useTransactions();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch = item.kode_billing?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const generatePDF = (trx: any) => {
    const doc = new jsPDF();

    doc.setFillColor(37, 99, 235); 
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BUKTI PEMBAYARAN', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('DOMPET PNBP - Official Receipt', 105, 28, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`ID Transaksi: #TRX-${trx.id}`, 14, 50);
    doc.text(`Tanggal: ${new Date(trx.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}`, 14, 56);
    doc.text(`Kode Billing: ${trx.kode_billing}`, 14, 62);

    const statusText = trx.status === 'SUDAH_DIBAYAR' ? 'LUNAS' : trx.status;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(trx.status === 'SUDAH_DIBAYAR' ? 22 : 200, trx.status === 'SUDAH_DIBAYAR' ? 163 : 150, trx.status === 'SUDAH_DIBAYAR' ? 74 : 0);
    doc.text(`STATUS: ${statusText}`, 140, 50);

    const tableData = [
        ['Deskripsi', 'Detail'],
        ['Kode Billing', trx.kode_billing],
        ['Waktu Transaksi', new Date(trx.created_at).toLocaleString('id-ID')],
        ['Total Tagihan', `Rp ${Number(trx.total_harga).toLocaleString('id-ID')}`],
    ];

    autoTable(doc, {
        startY: 70,
        head: [['Item', 'Keterangan']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255 },
        styles: { fontSize: 10, cellPadding: 4 },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text('Bukti ini adalah dokumen sah yang diterbitkan oleh sistem Dompet PNBP.', 105, finalY, { align: 'center' });
    doc.text('Terima kasih telah melakukan transaksi.', 105, finalY + 5, { align: 'center' });

    doc.save(`Invoice-${trx.kode_billing || trx.id}.pdf`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUDAH_DIBAYAR':
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" /> Lunas
            </span>
        );
      case 'BELUM_DIBAYAR':
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600 border border-amber-200">
                <HistoryIcon className="w-3 h-3" /> Menunggu
            </span>
        );
      default:
        return <Badge variant="outline" className="text-slate-500">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Riwayat Transaksi</h1>
            <p className="text-blue-100 mt-2 text-lg opacity-90">Pantau status pembayaran dan arsip pesanan Anda.</p>
          </div>
          <Button 
            onClick={() => getHistory()} 
            disabled={isLoading}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm shadow-lg h-12 px-6 rounded-xl"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 border-none shadow-xl bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-0">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-72 group">
                        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input 
                            placeholder="Cari Kode Billing..." 
                            className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-blue-500/20 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-[200px]">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl">
                                <div className="flex items-center text-slate-600">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">Semua Status</SelectItem>
                                <SelectItem value="BELUM_DIBAYAR">Belum Bayar</SelectItem>
                                <SelectItem value="SUDAH_DIBAYAR">Lunas</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID Transaksi</th>
                                <th className="px-6 py-4 font-semibold">Kode Billing</th>
                                <th className="px-6 py-4 font-semibold">Tanggal</th>
                                <th className="px-6 py-4 font-semibold">Total Tagihan</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <FileText className="h-8 w-8 text-slate-300" />
                                            </div>
                                            <p className="font-medium">Tidak ada riwayat transaksi ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredHistory.map((trx) => (
                                    <tr key={trx.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            #TRX-{trx.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded w-fit">
                                                {trx.kode_billing || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(trx.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">
                                            Rp {Number(trx.total_harga).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(trx.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {trx.status === 'BELUM_DIBAYAR' ? (
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-lg h-9">
                                                    Bayar <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                                                </Button>
                                            ) : trx.status === 'SUDAH_DIBAYAR' ? (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => generatePDF(trx)}
                                                    className="border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-slate-600 rounded-lg h-9 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors"
                                                >
                                                    <Download className="mr-1.5 h-3.5 w-3.5" /> Bukti
                                                </Button>
                                            ) : (
                                                <span className="text-slate-300">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <div className="w-full lg:w-80 flex flex-col gap-6">
            <Card className="border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl overflow-hidden relative">
                <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                        <Wallet className="h-6 w-6 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Total Pengeluaran</p>
                    <h3 className="text-3xl font-bold mt-1">
                        Rp {history
                            .filter(h => h.status === 'SUDAH_DIBAYAR')
                            .reduce((acc, curr) => acc + Number(curr.total_harga), 0)
                            .toLocaleString('id-ID')
                        }
                    </h3>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        Total transaksi berhasil dibayar
                    </div>
                </CardContent>
                <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-emerald-500/20 rounded-full blur-3xl" />
            </Card>

            <Card className="border-none shadow-lg bg-white rounded-3xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <HistoryIcon className="h-5 w-5 text-blue-600" />
                    Aktivitas Terbaru
                </h3>
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                    {history.slice(0, 3).map((item, i) => (
                        <div key={i} className="relative">
                            <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white ${item.status === 'SUDAH_DIBAYAR' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <p className="text-xs text-slate-400 font-medium mb-0.5">
                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </p>
                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                                {item.kode_billing ? `Pembayaran #${item.kode_billing}` : `Order #${item.id}`}
                            </p>
                            <p className="text-xs text-slate-500">
                                Rp {Number(item.total_harga).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;