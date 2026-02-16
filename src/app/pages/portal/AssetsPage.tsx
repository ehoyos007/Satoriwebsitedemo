import { useState, useEffect, useCallback } from 'react';
import {
  Upload,
  Download,
  FileText,
  Image,
  File,
  Trash2,
  X,
} from 'lucide-react';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';

interface FileItem {
  name: string;
  id: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

export function AssetsPage() {
  const { client, loading: clientLoading } = useClientData();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const bucketPath = client?.id ? `${client.id}/` : null;

  const fetchFiles = useCallback(async () => {
    if (!bucketPath) return;
    setLoading(true);

    const { data, error } = await supabase
      .storage
      .from('onboarding-assets')
      .list(bucketPath, { sortBy: { column: 'created_at', order: 'desc' } });

    if (!error && data) {
      setFiles(data as FileItem[]);
    }
    setLoading(false);
  }, [bucketPath]);

  useEffect(() => {
    if (client) fetchFiles();
    else setLoading(false);
  }, [client, fetchFiles]);

  const handleUpload = async (fileList: FileList) => {
    if (!bucketPath) return;
    setUploading(true);

    for (const file of Array.from(fileList)) {
      const path = `${bucketPath}${file.name}`;
      await supabase.storage.from('onboarding-assets').upload(path, file, { upsert: true });
    }

    setUploading(false);
    fetchFiles();
  };

  const handleDownload = async (fileName: string) => {
    if (!bucketPath) return;
    const { data } = await supabase
      .storage
      .from('onboarding-assets')
      .createSignedUrl(`${bucketPath}${fileName}`, 60);

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const handlePreview = async (fileName: string) => {
    if (!bucketPath) return;
    const { data } = await supabase
      .storage
      .from('onboarding-assets')
      .createSignedUrl(`${bucketPath}${fileName}`, 300);

    if (data?.signedUrl) {
      setPreviewUrl(data.signedUrl);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!bucketPath) return;
    await supabase.storage.from('onboarding-assets').remove([`${bucketPath}${fileName}`]);
    fetchFiles();
  };

  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);

  const formatSize = (bytes?: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  if (clientLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Assets & Uploads
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading files...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Assets & Uploads
          </span>
        </h1>
        <p className="text-zinc-400">Upload logos, photos, or documents for your project</p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`glass-panel p-12 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/5'
            : 'border-white/10 hover:border-cyan-400/30'
        }`}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-lg mb-2">
          {uploading ? 'Uploading...' : 'Drag & drop files here or click to browse'}
        </h3>
        <p className="text-sm text-zinc-500">Supports images, PDFs, and documents</p>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
      </div>

      {/* File Grid */}
      {files.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <File className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No files uploaded yet</h3>
          <p className="text-zinc-500">Upload your first file to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.id || file.name}
              className="glass-panel p-4 rounded-xl border border-white/10 hover:border-cyan-400/20 transition-all group"
            >
              {/* Thumbnail */}
              <div
                className="h-32 rounded-lg bg-zinc-900/50 border border-white/5 flex items-center justify-center mb-3 cursor-pointer overflow-hidden"
                onClick={() => isImage(file.name) && handlePreview(file.name)}
              >
                {isImage(file.name) ? (
                  <Image className="w-10 h-10 text-cyan-400/40" />
                ) : (
                  <FileText className="w-10 h-10 text-violet-400/40" />
                )}
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate" title={file.name}>{file.name}</p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                    <span>{formatSize(file.metadata?.size)}</span>
                    <span>{new Date(file.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDownload(file.name)}
                    className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-zinc-400 hover:text-cyan-400 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800"
            onClick={() => setPreviewUrl(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
