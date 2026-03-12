-- Schema version: 1.1
-- Database: administrative_db (cfjtndyvpifuukhmtfcz)

CREATE TABLE IF NOT EXISTS web_ier_diagnostics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_name TEXT,
  restaurant_city TEXT,
  score_total INTEGER NOT NULL,
  dim_financeira INTEGER,
  dim_custos INTEGER,
  dim_processos INTEGER,
  dim_pessoas INTEGER,
  dim_comercial INTEGER,
  dim_experiencia INTEGER,
  dim_dados INTEGER,
  dim_lideranca INTEGER,
  classification VARCHAR,
  answers JSONB,
  raw_answers JSONB,
  google_reviews_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS web_chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  diagnostic_id UUID REFERENCES web_ier_diagnostics(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS web_chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES web_chat_sessions(id),
  role VARCHAR CHECK (role IN ('user', 'ai', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for web_ier_diagnostics
ALTER TABLE web_ier_diagnostics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON web_ier_diagnostics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous read for average" ON web_ier_diagnostics FOR SELECT USING (true);

-- RLS for web_chat_sessions
ALTER TABLE web_chat_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert session" ON web_chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select session" ON web_chat_sessions FOR SELECT USING (true);

-- RLS for web_chat_messages
ALTER TABLE web_chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert message" ON web_chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select message" ON web_chat_messages FOR SELECT USING (true);
