from flask import Flask, render_template, request, redirect, url_for
from supabase import create_client, Client

app = Flask(__name__)

# 🔐 Credenciais fixas do Supabase
url = "https://pkmqlrloqtlygrzyonzk.supabase.co"
key = "sb_secret_295BdRZiFEW843jH3egeVQ_dXm4mtgS"

# Cria cliente Supabase
supabase: Client = create_client(url, key)

# ---------- Funções de Banco de Dados ----------
def salvar_no_supabase(novo_cadastro: dict):
    try:
        supabase.table("faturamento").insert(novo_cadastro).execute()
    except Exception as e:
        print(f"Erro ao inserir no Supabase: {e}")

def carregar_cadastros():
    try:
        response = supabase.table("faturamento").select("*").order("id", desc=False).execute()
        return response.data if response.data else []
    except Exception as e:
        print(f"Erro ao carregar dados do Supabase: {e}")
        return []

def excluir_cadastro_supabase(linha_id: int):
    try:
        supabase.table("faturamento").delete().eq("id", linha_id).execute()
    except Exception as e:
        print(f"Erro ao excluir do Supabase: {e}")

# ---------- Funções Auxiliares ----------
def parse_valor(valor):
    if not valor:
        return 0.0
    valor_str = str(valor).strip()
    valor_limpo = valor_str.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".")
    try:
        return float(valor_limpo)
    except ValueError:
        print(f"Erro ao converter valor: {valor_str}")
        return 0.0

# ---------- Rotas ----------
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/extrato")
def extrato():
    return render_template("extrato.html")

@app.route('/excluir_cadastro', methods=['POST'])
def excluir_cadastro():
    linha_id = request.form.get('id')
    if linha_id and linha_id.isdigit():
        excluir_cadastro_supabase(int(linha_id))
    return redirect(url_for('lista_cadastros'))

@app.route("/enviar", methods=["POST"])
def enviar():
    dados = request.form.to_dict()
    salvar_no_supabase(dados)
    return redirect(url_for('home'))

@app.route("/cadastros")
def lista_cadastros():
    cadastros = carregar_cadastros()

    total_orcamento = 0.0
    total_minutos = 0
    projetos = set()
    categorias = set()

    for c in cadastros:
        valor = c.get('orcamento')
        if valor:
            total_orcamento += parse_valor(valor)

        tempo = c.get('tempo_servico', '')
        if tempo:
            try:
                if ':' in tempo:
                    horas, minutos = map(int, tempo.split(':'))
                    total_minutos += horas * 60 + minutos
                else:
                    total_minutos += int(float(tempo) * 60)
            except ValueError:
                pass

        if c.get("nome_projeto"):
            projetos.add(c["nome_projeto"])
        if c.get("tipo_projeto"):
            categorias.add(c["tipo_projeto"])

    total_liquido = total_orcamento / 2
    horas_totais = total_minutos // 60
    minutos_totais = total_minutos % 60
    total_horas_formatado = f"{int(horas_totais):02d}:{int(minutos_totais):02d}"

    return render_template(
        "cadastros.html",
        cadastros=cadastros,
        total_orcamento=total_orcamento,
        total_liquido=total_liquido,
        total_horas_formatado=total_horas_formatado,
        projetos=sorted(projetos),
        categorias=sorted(categorias)
    )