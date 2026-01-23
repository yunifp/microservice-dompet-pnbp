import React, { useEffect, useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, Filter, RefreshCw, FileText } from 'lucide-react';

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUDAH_DIBAYAR':
        return <Badge className="bg-green-600">Lunas</Badge>;
      case 'BELUM_DIBAYAR':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Belum Bayar</Badge>;
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Transaksi</h1>
          <p className="text-slate-500">Pantau status pembayaran dan riwayat pesanan Anda</p>
        </div>
        <Button variant="outline" onClick={() => getHistory()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Data</CardTitle>
          <CardDescription>Cari transaksi berdasarkan kode billing atau status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label>Cari Kode Billing</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Contoh: BILL-173..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-[200px] space-y-2">
              <Label>Status Pembayaran</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Semua Status" />
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Kode Billing</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Total Tagihan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                    Tidak ada data transaksi ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell className="font-medium">#TRX-{trx.id}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {trx.kode_billing || '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(trx.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="font-bold text-slate-700">
                      Rp {Number(trx.total_harga).toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>{getStatusBadge(trx.status)}</TableCell>
                    <TableCell className="text-right">
                      {trx.status === 'BELUM_DIBAYAR' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                           Bayar
                        </Button>
                      )}
                      {trx.status === 'SUDAH_DIBAYAR' && (
                        <Button size="sm" variant="outline">
                           <FileText className="h-3 w-3 mr-1" /> Bukti
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;