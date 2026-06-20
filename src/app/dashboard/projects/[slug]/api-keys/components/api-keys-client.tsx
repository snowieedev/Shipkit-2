"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, AlertCircle } from "lucide-react"
import { createApiKey, revokeApiKey } from "../actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ApiKeysClient({ project, apiKeys }: { project: any, apiKeys: any[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setNewKey(null)
    const result = await createApiKey(project.id, project.slug)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else if (result.success && result.rawKey) {
      setNewKey(result.rawKey)
      toast.success("API key generated successfully")
    }
  }

  const handleRevoke = async (keyId: string) => {
    setIsLoading(true)
    const result = await revokeApiKey(keyId, project.id, project.slug)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("API key revoked successfully")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">Manage API keys to authenticate with the ShipKit API.</p>
        </div>
        <Button onClick={handleGenerate} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      {newKey && (
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-semibold">Keep this safe!</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-2">
            <p>This is your new API key. It will only be shown once. Please copy it and store it somewhere safe.</p>
            <div className="flex items-center gap-2 bg-background border p-2 rounded-md">
              <code className="text-sm font-mono flex-1">{newKey}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(newKey)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          {apiKeys && apiKeys.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key Prefix</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key: any) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-mono">{key.key_prefix}</TableCell>
                    <TableCell>
                      {key.revoked_at ? (
                        <Badge variant="destructive">Revoked</Badge>
                      ) : (
                        <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}</TableCell>
                    <TableCell className="text-right">
                      {!key.revoked_at && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleRevoke(key.id)}
                          disabled={isLoading}
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No API keys generated yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
